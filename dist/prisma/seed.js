"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const roles = [
        { name: 'ADMIN', code: 'ADMIN' },
        { name: 'USER', code: 'USER' },
    ];
    for (const role of roles) {
        await prisma.rol.upsert({
            where: { code: role.code },
            update: {},
            create: { name: role.name, code: role.code },
        });
    }
    console.log('Roles created or already exist');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map