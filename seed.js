const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const load = async () => {
    try {
        await prisma.user_level.upsert({
            where: {
                id: 'superadmin'
            },
            create: {
                id: 'superadmin',
                type_code: 'superadmin',
                type: 'Super Admin'
            },
            update: {
                id: 'superadmin',
                type_code: 'superadmin',
                type: 'Super Admin'
            }
        })

        await prisma.user_level.upsert({
            where: {
                id: 'admin'
            },
            create: {
                id: 'admin',
                type_code: 'admin',
                type: 'Admin'
            },
            update: {
                id: 'admin',
                type_code: 'admin',
                type: 'Admin'
            }
        })

        await prisma.user_level.upsert({
            where: {
                id: 'kepsek'
            },
            create: {
                id: 'kepsek',
                type_code: 'kepsek',
                type: 'Kepala Sekolah'
            },
            update: {
                id: 'kepsek',
                type_code: 'kepsek',
                type: 'Kepala Sekolah'
            }
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}
load();
