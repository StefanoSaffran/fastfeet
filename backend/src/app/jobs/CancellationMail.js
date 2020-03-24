import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;

    const descriptions = problem.map(p => `${p.description}, `);

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        date: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: ptBR,
          }
        ),
        problem: descriptions,
      },
    });
  }
}

export default new CancellationMail();
