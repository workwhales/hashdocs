export const HASHDOCS_META_TAGS = {
  title: {
    template: '%s | Dealroom',
    default: 'Dealroom', // a default is required when creating a template
  },
  description:
    'An dataroom platform with secure document sharing, powerful link controls and realtime tracking.',
  icon: '/logo_256.png',
  og_image: `${
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://' + process.env.VERCEL_BRANCH_URL
  }/assets/dealroom_og.jpg`,
  theme_color: '#1D4ED8',
};
