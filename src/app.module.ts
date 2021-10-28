import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from "./basket/basket.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import {Product} from "./products/product.model";
import {Category} from "./categories/category.model";
import {Basket} from "./basket/basket.model";
import {UsersModule} from "./users/users.module";
import {OrdersModule} from "./orders/orders.module";
import {Order} from "./orders/order.model";
import {OrderItems} from "./order_items/order_items.model";
import {OrderItemsModule} from "./order_items/order_items.module";


@Module({
  imports: [BasketModule, CategoriesModule, ProductsModule, UsersModule, OrdersModule, OrderItemsModule,
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_POST),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Product, Category, Basket, Order, OrderItems],
        autoLoadModels: true
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
