import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const iconMap = {
  facebook: { label: 'Facebook', Icon: FaFacebookF, color: 'hover:text-blue-600' },
  instagram: { label: 'Instagram', Icon: FaInstagram, color: 'hover:text-pink-600' },
  x: { label: 'X', Icon: FaXTwitter, color: 'hover:text-slate-950' },
  linkedin: { label: 'LinkedIn', Icon: FaLinkedinIn, color: 'hover:text-sky-700' },
};

function encode(value) {
  return encodeURIComponent(value ?? '');
}

function buildShareUrl(platform, url, title) {
  const encodedUrl = encode(url);
  const encodedTitle = encode(title);
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'x':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'instagram':
      // Instagram does not support direct web share URL for arbitrary links.
      return `https://www.instagram.com/`;
    default:
      return encodedUrl;
  }
}

function ShareIcons({ url, title }) {
  return (
    <div className="mt-4 flex items-center gap-2.5">
      {Object.entries(iconMap).map(([key, value]) => (
        <a
          key={key}
          href={buildShareUrl(key, url, title)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${value.label}`}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-slate-300 ${value.color}`}
        >
          <value.Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export default ShareIcons;
