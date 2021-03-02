export default (): any => ({
  PORT: parseInt(process.env.PORT, 10) || 3010,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  ENABLE_CORS: true,
  RATE_LIMIT: {
    max: 100,
    minutes: 10,
  },
  EMAIL_CONFIGURATION: {
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    SECURE_PORT: process.env.SECURE_PORT || 465,
    SECURE: process.env.SECURE || true,
    EMAIL_ID: process.env.EMAIL_ID || 'DoNotReply@xiiiusa.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'LJHyy3JmN*ceX_x_pLR',
    EMAIL_FROM: process.env.EMAIL_FROM || 'DoNotReply@xiiiusa.com',
    CONFIRMATION_EMAIL_SUBJECT:
      process.env.CONFIRMATION_EMAIL_SUBJECT ||
      'Digital Enterprise Initiative™ confirmation',
    LEAD_EMAIL_SUBJECT: process.env.LEAD_EMAIL_SUBJECT || 'KLW - Deals',
    CABLE_LEAD_EMAIL_SUBJECT:
      process.env.CABLE_LEAD_EMAIL_SUBJECT || 'Cable Deals',
    CARRIER_LEAD_EMAIL_SUBJECT:
      process.env.CARRIER_LEAD_EMAIL_SUBJECT || 'Carrier - Deals',
    CLOUD_LEAD_EMAIL_SUBJECT:
      process.env.CLOUD_LEAD_EMAIL_SUBJECT || 'Cloud - Deals',
    SDWAN_LEAD_EMAIL_SUBJECT:
      process.env.SDWAN_LEAD_EMAIL_SUBJECT || 'SDWAN - Deals',
    CONSULTATION_LEAD_EMAIL_SUBJECT:
      process.env.CONSULTATION_LEAD_EMAIL_SUBJECT || 'Consultation - Deals',
    UCAAS_LEAD_EMAIL_SUBJECT:
      process.env.UCAAS_LEAD_EMAIL_SUBJECT || 'UCaaS - Deals',
    BRANDING_DEALS_SUBJECT:
      process.env.BRANDING_DEALS_SUBJECT || 'Branding Deals',

    BRANDING_EMAIL_SUBJECT:
      process.env.BRANDING_EMAIL_SUBJECT || 'DEI™-Graphic Design-Branding',
    CLOUD_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.CLOUD_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-Cloud Service',
    CABLE_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.CABLE_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-Cable Service',
    CARRIER_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.CARRIER_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-Carrier Service',
    SDWAN_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.SDWAN_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-SDWAN Service',
    CONSULTATION_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.CONSULTATION_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-Consultation Service',
    UCASS_SERVICE_CONFIRMATION_EMAIL_SUBJECT:
      process.env.UCASS_SERVICE_CONFIRMATION_EMAIL_SUBJECT ||
      'DEI™-UCaaS Service',
  },
  HUBSPOT_API_KEY:
    process.env.HUBSPOT_API_KEY || '56e2b3ac-6375-47a8-9362-dce12fdf7faa',
  HUBSPOT_CLIENT_ID: '11c57c30-1e9e-450d-83c7-9f0ea76649c3',
  HUBSPOT_CLIENT_SECRET: 'ce36e4e2-9531-4279-8088-407b46bd1b89',
});
