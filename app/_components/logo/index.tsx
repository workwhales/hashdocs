import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export type HashdocsLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  className?: string;
  link?: boolean;
};

const logoSizeMap = {
  sm: 'scale-50',
  md: 'scale-75',
  lg: '',
};

const textSizeMap = {
  sm: 'text-xl mt-1',
  md: 'text-2xl mt-2',
  lg: 'text-4xl mt-4',
};

export const HashdocsLogo = ({
  size = 'md',
  full = false,
  className = '',
  link = false,
}: HashdocsLogoProps) => {
  return (
    <Link
      href={link ? '/' : ''}
      className={clsx(
        'text-gray-gradient flex items-center gap-x-2.5',
        className
      )}
    >
      <div
        className={clsx(
          'relative h-12 w-12 shrink-0 overflow-hidden rounded-md',
          logoSizeMap[size]
        )}
      >
        <Image
          src={'/logo_256.png'}
          fill={true}
          alt={'Dealroom'}
        />
      </div>
      {full && (
        <p className={clsx('tracking-wide font-semibold ', textSizeMap[size])}>
          Dealroom
        </p>
      )}
    </Link>
  );
};
