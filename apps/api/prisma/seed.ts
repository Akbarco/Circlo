import { Roletype } from "../src/generated/prisma/enums";
import {prisma} from "../src/lib/prisma";

async function main() {
  const roles: Roletype[] = ['ADMIN', 'MEMBER', 'OWNER', 'USER']

  for (const role of roles) {
    const roleExist = await prisma.role.findFirst({
      where: {
        role: role
      }
    })

    await prisma.role.upsert({
      where: {
        id: roleExist?.id ?? ""
      },
      create: {
        role: role
      },
      update: {}
    })
  }

  console.log('Success roles')
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (err) => {
  console.error(err)
  await prisma.$disconnect()
  process.exit(1)
})

