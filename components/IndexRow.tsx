type IndexRowProps = {
  title: string;
  body: string;
  heading: "h2" | "h3";
};

export default function IndexRow({ title, body, heading }: IndexRowProps) {
  const Title = heading;

  return (
    <article className="border-t border-clDeepOcean/14 py-7">
      <Title className="font-lora text-[26px] font-semibold leading-[34px] text-clDeepOcean">
        {title}
      </Title>
      <p className="mt-2.5 font-inter text-[17px] leading-7 text-clDeepOcean">{body}</p>
    </article>
  );
}
