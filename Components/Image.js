const { default: Image } = require("next/image");

const Picture = () => {
  return (
    <>
      <figure className="max-w-lg">
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/docs/images/examples/image-3@2x.jpg"
          alt="image description"
        />
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Image caption
        </figcaption>
      </figure>
    </>
  );
};

export default Picture;
