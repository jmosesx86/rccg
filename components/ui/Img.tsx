import Image, { type ImageProps } from "next/image";
import { imageSizes } from "@/lib/imageSizes";

type ImgProps = Omit<ImageProps, "width" | "height" | "src"> & { src: string };

/**
 * next/image with intrinsic dimensions looked up from lib/imageSizes.ts, so it drops in
 * wherever a plain image tag was used. Layout is still controlled by className.
 */
export default function Img({ src, alt, sizes = "100vw", ...rest }: ImgProps) {
  const [width, height] = imageSizes[src] ?? [1600, 1200];
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} {...rest} />;
}
