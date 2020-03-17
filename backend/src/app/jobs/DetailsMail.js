import Mail from '../../lib/Mail';

class DetailsMail {
  get key() {
    return 'DetailsMail';
  }

  async handle({ data }) {
    const { recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'details',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
      },
    });
  }
}

export default new DetailsMail();
