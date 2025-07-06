import { useTranslations } from 'next-intl';

export function useContactForm() {
  const t = useTranslations();

  const showSuccessMessage = (message: string) => {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-weight: 500;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
      successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      successDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
      }, 300);
    }, 3000);
  };

  const clearForm = () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  const sendWhatsApp = () => {
    // Get the input values
    const fullName = (document.querySelector('[name="fullname"]') as HTMLInputElement)?.value;
    const email = (document.querySelector('[name="email"]') as HTMLInputElement)?.value;
    const subject = (document.querySelector('[name="subject"]') as HTMLInputElement)?.value;
    const message = (document.querySelector('[name="message"]') as HTMLTextAreaElement)?.value;

    // Detect current language
    const isPortuguese = window.location.pathname.includes('/pt');
    
    // Check if all required fields are filled
    if (!fullName || !email || !subject || !message) {
      const alertMessage = isPortuguese 
        ? t('contact.form.fillAllFields') 
        : t('contact.form.fillAllFields');
      alert(alertMessage);
      return;
    }
    
    // Format the WhatsApp message based on language
    let formattedMessage: string;
    if (isPortuguese) {
      formattedMessage = `Olá Lucas! 👋\n\nMe chamo *${fullName}*\nMeu email é: ${email}\n\n📋 *Assunto:* ${subject}\n\n💬 *Mensagem:*\n${message}\n\n_Enviado através do seu portfólio_`;
    } else {
      formattedMessage = `Hello Lucas! 👋\n\nMy name is *${fullName}*\nMy email is: ${email}\n\n📋 *Subject:* ${subject}\n\n💬 *Message:*\n${message}\n\n_Sent from your portfolio_`;
    }

    // Create the WhatsApp URL with the pre-filled message
    const encodedMessage = encodeURIComponent(formattedMessage);
    const phoneNumber = "5531996964056"; // Full phone number with country code +55 31 99696-4056
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open the WhatsApp URL in a new window or tab
    window.open(whatsappURL, '_blank');
    
    // Show success message and clear the form after sending
    const successMessage = isPortuguese 
      ? t('contact.form.successWhatsApp') 
      : t('contact.form.successWhatsApp');
    showSuccessMessage(successMessage);
    clearForm();
  };

  const sendEmail = () => {
    // Get the input values
    const fullName = (document.querySelector('[name="fullname"]') as HTMLInputElement)?.value;
    const email = (document.querySelector('[name="email"]') as HTMLInputElement)?.value;
    const subject = (document.querySelector('[name="subject"]') as HTMLInputElement)?.value;
    const message = (document.querySelector('[name="message"]') as HTMLTextAreaElement)?.value;

    // Detect current language
    const isPortuguese = window.location.pathname.includes('/pt');
    
    // Check if all required fields are filled
    if (!fullName || !email || !subject || !message) {
      const alertMessage = isPortuguese 
        ? t('contact.form.fillAllFields') 
        : t('contact.form.fillAllFields');
      alert(alertMessage);
      return;
    }
    
    // Format the email body based on language
    let body: string;
    if (isPortuguese) {
      body = encodeURIComponent(`Olá Lucas!\n\nMe chamo ${fullName}.\nMeu email é: ${email}\n\nMensagem:\n${message}\n\nEnviado através do seu portfólio.`);
    } else {
      body = encodeURIComponent(`Hello Lucas!\n\nMy name is ${fullName}.\nMy email is: ${email}\n\nMessage:\n${message}\n\nSent from your portfolio.`);
    }
    
    const mailtoLink = `mailto:lucas@campregher.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open the user's default email client with the mailto link
    window.location.href = mailtoLink;
    
    // Show success message and clear the form after sending (with a small delay to ensure mailto link works)
    setTimeout(() => {
      const successMessage = isPortuguese 
        ? t('contact.form.successEmail') 
        : t('contact.form.successEmail');
      showSuccessMessage(successMessage);
      clearForm();
    }, 100);
  };

  return {
    sendWhatsApp,
    sendEmail
  };
} 