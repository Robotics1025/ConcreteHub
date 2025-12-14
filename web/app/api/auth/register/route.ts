import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, phone, role, businessName, businessType } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role: role || 'BUYER',
            },
        });

        // If supplier, create seller profile
        if (role === 'SELLER' && businessName) {
            await prisma.seller.create({
                data: {
                    userId: user.id,
                    storeName: businessName,
                    storeDetails: businessType,
                },
            });
        }

        // Create welcome notification
        await prisma.notification.create({
            data: {
                userId: user.id,
                type: 'system',
                title: 'Welcome to ConcreteHub!',
                message: 'Thank you for joining our platform. Start exploring products and services.',
            },
        });

        return NextResponse.json(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
