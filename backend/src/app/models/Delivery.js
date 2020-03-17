import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, [
            'canceled_at',
            'start_date',
            'end_date',
          ]),
          get() {
            if (this.get('canceled_at') !== null) return 'Canceled';
            if (this.get('end_date') !== null) return 'Delivered';
            if (this.get('start_date') !== null) return 'Withdrawal';
            return 'Pending';
          },
        },
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
