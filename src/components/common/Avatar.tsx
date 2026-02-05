"use client";

type AvatarProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export default function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <img
      src={src || "/Avatar.svg"}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/Avatar.svg";
      }}
    />
  );
}
