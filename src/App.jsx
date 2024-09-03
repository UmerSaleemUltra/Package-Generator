import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';

const PackageForm = () => {
  const [formValues, setFormValues] = useState({
    packageName: '',
    companyName: '',
  });

  const [selectedServices, setSelectedServices] = useState({
    standardBusinessAddress: true,
    mailForwarding: true,
    registeredAgent: true,
    stateFilingFee: true,
    companyFormation: true,
    ein: true,
    wiseAccount: false,
    payoneerSetup: true,
    stripeSetup: true,
    usPhoneNumber: true,
    addressDashboard: true,
    businessTaxUpdates: true,
    customerSupport: true,
    fincenReport: true,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedServices({ ...selectedServices, [name]: checked });
  };

  const generateMessage = () => {
    const { packageName, companyName } = formValues;

    const servicesList = [
      { label: "Standard Business Address - 1 Year", value: selectedServices.standardBusinessAddress },
      { label: "Mail Forwarding Service", value: selectedServices.mailForwarding },
      { label: "Registered Agent - 1 Year", value: selectedServices.registeredAgent },
      { label: "LLC State Filing Fee", value: selectedServices.stateFilingFee },
      { label: "Company Formation with State", value: selectedServices.companyFormation },
      { label: "Employer Identification Number (EIN)", value: selectedServices.ein },
      { label: "Wise Business Account (Fee Not Included)", value: selectedServices.wiseAccount },
      { label: "Payoneer Business Account Setup", value: selectedServices.payoneerSetup },
      { label: "Stripe Account Setup Assistance", value: selectedServices.stripeSetup },
      { label: "U.S. Phone Number", value: selectedServices.usPhoneNumber },
      { label: "Address Dashboard Access", value: selectedServices.addressDashboard },
      { label: "Business Tax Updates", value: selectedServices.businessTaxUpdates },
      { label: "Lifetime Customer Support", value: selectedServices.customerSupport },
      { label: "FinCEN BOI Report", value: selectedServices.fincenReport },
    ].filter(service => service.value).map(service => `✅ ${service.label}`).join('\n');

    const template = `${companyName} ${packageName} Package 🚀

What’s Included:

${servicesList}

Requirements:

The company name you'd like to register.
A clear photo of your valid passport or CNIC.
Your residential address.

Made with ❤ for Pakistani entrepreneurs 🇵🇰`;

    setMessage(template);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    alert('Message copied to clipboard!');
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ padding: '30px', maxWidth: '900px', margin: 'auto', marginTop: '50px', backgroundColor: '#f7f9fc', borderRadius: '10px' }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Package Generator
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <TextField
          label="Package Name"
          variant="outlined"
          name="packageName"
          value={formValues.packageName}
          onChange={handleChange}
          fullWidth
          sx={{ borderRadius: '5px', backgroundColor: '#ffffff' }}
        />
        <TextField
          label="Company Name"
          variant="outlined"
          name="companyName"
          value={formValues.companyName}
          onChange={handleChange}
          fullWidth
          sx={{ borderRadius: '5px', backgroundColor: '#ffffff' }}
        />

        <Typography variant="h6" gutterBottom>
          Select Included Services:
        </Typography>
        {Object.keys(selectedServices).map((service) => (
          <FormControlLabel
            key={service}
            control={
              <Checkbox
                checked={selectedServices[service]}
                onChange={handleServiceChange}
                name={service}
                color="primary"
              />
            }
            label={service.split(/(?=[A-Z])/).join(' ')}
          />
        ))}

        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={generateMessage} sx={{ padding: '10px 20px' }}>
            Generate Message
          </Button>
          <Button variant="outlined" color="secondary" onClick={copyToClipboard} sx={{ padding: '10px 20px' }}>
            Copy to Clipboard
          </Button>
        </Box>
      </Box>
      {message && (
        <Box sx={{ marginTop: '20px', whiteSpace: 'pre-wrap', backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h6">Generated Message:</Typography>
          <Typography>{message}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PackageForm;
