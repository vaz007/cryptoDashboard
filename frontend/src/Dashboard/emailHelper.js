import emailjs from '@emailjs/browser';

const sendEmailNotification = async (coinName, coinPrice, threshold) => {
  try {
    const emailParams = {
      to_email: 'atharvagholap24@gmail.com',
      subject: `Price Alert: ${coinName} Exceeded Threshold`,
      message: `${coinName} has exceeded the threshold of ${threshold} BTC. The current price is ${coinPrice} BTC.`,
    };

    const response = await emailjs.send(
      'your_service_id', // Replace with your service ID
      'your_template_id', // Replace with your template ID
      emailParams,
      'your_user_id' // Replace with your user ID
    );

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const monitorCoinPrices = (cryptoData, thresholds) => {
  const checkPrices = async () => {
    for (let coin of cryptoData) {
      const currentPrice = coin.price_btc;
      const threshold = thresholds[coin.name];

      if (threshold && currentPrice > threshold) {
        await sendEmailNotification(coin.name, currentPrice, threshold);
      }
    }
  };
  setInterval(checkPrices, 5000); // check every 5 seconds
};
