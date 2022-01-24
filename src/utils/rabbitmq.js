import amqp from 'amqplib/callback_api'
import * as sendMail from '../middlewares/nodemailer.middleware'

export const sender = (data) => {
    amqp.connect('amqp://localhost', (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
            var queue = 'registration';
            var msg = JSON.stringify(data);

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));

        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 5000);
    });
}

export const reciever = () => {
    amqp.connect('amqp://localhost', (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }

            var queue = 'registration';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function(msg) {
                const data = JSON.parse(msg.content);
                sendMail.registration(data)
            }, {
                noAck: true
            });
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 5000);
    });
}