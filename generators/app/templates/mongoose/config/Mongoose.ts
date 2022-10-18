import mongoose from 'mongoose';
import User from '../models/User';

export default class Mongoose {
  async connect(): Promise<void> {
    await mongoose.connect(
      `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`
    );

    try {
      const existDemoUser = await User.count({ username: 'demo' });

      if (existDemoUser === 0) {
        await this.createDemoUser();
        console.log('Demo user created');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createDemoUser(): Promise<void> {
    const user = new User({
      username: 'demo',
      email: 'demo@email.com',
      password: 'p4ssw0rd', // Update this
    });

    try {
      await user.save();
    } catch (e) {
      console.error(e);
    }
  }
}
