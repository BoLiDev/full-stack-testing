import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'
// 🐨 you'll want the set-cookie-parser module to parse
// 🐨 you'll also need:
// sessionKey from auth.server.ts
// prisma from db.server.ts
// sessionStorage from session.server.ts
import { insertNewUser } from '../db-utils.ts'

test('Users can add 2FA to their account and use it when logging in', async ({
	page,
}) => {
	const password = faker.internet.password()
	// 💣 you can remove this comment when you've used the user object.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const user = await insertNewUser({ password })

	// 🐨 create a new session for the user using prisma.session.create
	// 💰 you can reference the login utility from auth.server.ts if you need a reminder.

	// 🐨 get the cookieSession from sessionStorage.getSession
	// 🐨 set the sessionKey on the cookieSession to the session.id
	// 🐨 commit the cookieSession using sessionStorage.commitSession
	// 🐨 parse the setCookie header using setCookieParser.parseString
	// 💰 const { value: cookieValue } = setCookieParser.parseString(...)

	// 🐨 add the cookie to the browser context using page.context().addCookies
	// The options should be similar to what you'll find in the session.server.ts file.
	// 💰 make sure to set the value to cookieValue and the domain to 'localhost'!

	await page.goto('/settings/profile')

	await page.getByRole('link', { name: /enable 2fa/i }).click()

	await expect(page).toHaveURL(`/settings/profile/two-factor`)
	const main = page.getByRole('main')
	await main.getByRole('button', { name: /enable 2fa/i }).click()
})
