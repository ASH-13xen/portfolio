export type CertDetail = {
  icon: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl: string;
};

export const certDetails: Record<string, CertDetail> = {
  // "cert-aws": {
  //   name: "AWS Certified Cloud Practitioner",
  //   icon: "/photos/iconfolder.png",
  //   issuer: "Amazon Web Services",
  //   date: "Issued Dec 2024",
  //   description:
  //     "Validates overall understanding of the AWS Cloud platform, covering basic security, compliance, and cloud economics.",
  //   credentialUrl: "#",
  // },
};
