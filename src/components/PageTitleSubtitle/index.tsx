interface PageTitleSubtitleI {
  title?: string;
  subtitle?: string;
  containerStyle?: string;
}

const PageTitleSubtitle = ({
  title,
  subtitle,
  containerStyle,
}: PageTitleSubtitleI) => {
  return (
    <div className={containerStyle}>
      {title && <h1 className="text-center text-2xl font-semibold">{title}</h1>}
      {subtitle && <h2 className="text-body ">{subtitle}</h2>}
    </div>
  );
};

export default PageTitleSubtitle;
