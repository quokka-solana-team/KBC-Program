import React, { Ref, useCallback, useEffect, useState } from 'react';
import { MeshViewer } from '../MeshViewer';
import { Stream, StreamPlayerApi } from '@cloudflare/stream-react';
import { PublicKey } from '@solana/web3.js';
import { getLast } from '../../utils/utils';
import { MetadataCategory, MetadataFile, pubkeyToString } from '../../logic/get-mints';

const MeshContent = ({
  uri,
  animationUrl,
  className,
  style,
  files,
}: {
  uri?: string;
  animationUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  files?: (MetadataFile | string)[];
}) => {
  const renderURL =
    files && files.length > 0 && typeof files[0] === 'string'
      ? files[0]
      : animationUrl;

  return <MeshViewer url={renderURL} className={className} style={style} />;
};

export const CachedImageContent = ({
  uri,
  className,
  preview,
  style,
}: {
  uri?: string;
  className?: string;
  preview?: boolean;
  style?: React.CSSProperties;
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <img
      src={uri}
      className={className}
      loading="lazy"
      style={{ ...style }}
      onLoad={e => {
        setLoaded(true);
      }}
      {...(loaded ? {} : { height: 200 })}
    />
  );
};

const VideoContent = ({
  className,
  style,
  files,
  uri,
  animationURL,
  active,
}: {
  className?: string;
  style?: React.CSSProperties;
  files?: (MetadataFile | string)[];
  uri?: string;
  animationURL?: string;
  active?: boolean;
}) => {
  const [playerApi, setPlayerApi] = useState<StreamPlayerApi>();

  const playerRef = useCallback(
    ref => {
      setPlayerApi(ref);
    },
    [setPlayerApi],
  );

  useEffect(() => {
    if (playerApi) {
      playerApi.currentTime = 0;
    }
  }, [active, playerApi]);

  const likelyVideo = (files || []).filter((f, index, arr) => {
    if (typeof f !== 'string') {
      return false;
    }

    // TODO: filter by fileType
    return arr.length >= 2 ? index === 1 : index === 0;
  })?.[0] as string;

  const content =
    likelyVideo &&
    likelyVideo.startsWith('https://watch.videodelivery.net/') ? (
      <div className={`${className} square`}>
        <Stream
          streamRef={(e: any) => playerRef(e)}
          src={likelyVideo.replace('https://watch.videodelivery.net/', '')}
          loop={true}
          height={600}
          width={600}
          controls={false}
          videoDimensions={{
            videoHeight: 700,
            videoWidth: 400,
          }}
          autoplay={true}
          muted={true}
        />
      </div>
    ) : (
      <video
        className={className}
        playsInline={true}
        autoPlay={true}
        muted={true}
        controls={true}
        controlsList="nodownload"
        style={style}
        loop={true}
        poster={uri}
      >
        {likelyVideo && (
          <source src={likelyVideo} type="video/mp4" style={style} />
        )}
        {animationURL && (
          <source src={animationURL} type="video/mp4" style={style} />
        )}
        {files
          ?.filter(f => typeof f !== 'string')
          .map((f: any) => (
            <source src={f.uri} type={f.type} style={style} />
          ))}
      </video>
    );

  return content;
};

const HTMLContent = ({
  uri,
  animationUrl,
  className,
  preview,
  style,
  files,
  artView,
}: {
  uri?: string;
  animationUrl?: string;
  className?: string;
  preview?: boolean;
  style?: React.CSSProperties;
  files?: (MetadataFile | string)[];
  artView?: boolean;
}) => {
  if (!artView) {
    return (
      <CachedImageContent
        uri={uri}
        className={className}
        preview={preview}
        style={style}
      />
    );
  }
  const htmlURL =
    files && files.length > 0 && typeof files[0] === 'string'
      ? files[0]
      : animationUrl;
  return (
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-scripts"
      frameBorder="0"
      src={htmlURL}
      className={className}
      style={style}
    ></iframe>
  );
};

export const MediaContent = ({
  category,
  className,
  preview,
  style,
  active,
  allowMeshRender,
  pubkey,
  uri,
  animationURL,
  files,
  artView,
}: {
  category?: MetadataCategory;
  className?: string;
  preview?: boolean;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  ref?: Ref<HTMLDivElement>;
  active?: boolean;
  allowMeshRender?: boolean;
  pubkey?: PublicKey | string;
  uri?: string;
  animationURL?: string;
  files?: (MetadataFile | string)[];
  artView?: boolean;
}) => {
  const id = pubkeyToString(pubkey);


  animationURL = animationURL || '';

  const animationUrlExt = new URLSearchParams(
    getLast(animationURL.split('?')),
  ).get('ext');

  if (
    allowMeshRender &&
    (category === 'vr' ||
      animationUrlExt === 'glb' ||
      animationUrlExt === 'gltf')
  ) {
    return (
      <MeshContent
        uri={uri}
        animationUrl={animationURL}
        className={className}
        style={style}
        files={files}
      />
    );
  }

  const content =
    category === 'video' ? (
      <VideoContent
        className={className}
        style={style}
        files={files}
        uri={uri}
        animationURL={animationURL}
        active={active}
      />
    ) : category === 'html' || animationUrlExt === 'html' ? (
      <HTMLContent
        uri={uri}
        animationUrl={animationURL}
        className={className}
        preview={preview}
        style={style}
        files={files}
        artView={artView}
      />
    ) : (
      <CachedImageContent
        uri={uri}
        className={className}
        preview={preview}
        style={style}
      />
    );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </div>
  );
};