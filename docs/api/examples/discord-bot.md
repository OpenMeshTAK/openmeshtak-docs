# Build a Discord bot integration

The minimal integration uses one slash command such as `/join`.

## API client permissions

Give the bot an API client limited to one event with:

- `members.sync`

Add `member-claims.create` only if the bot also delivers private participant claim links.

## Flow

1. Discord authenticates the user and supplies their Discord ID and roles.
2. The bot maps Discord roles to configured OpenMeshTak role and group slugs.
3. The bot sends an idempotent external-member `PUT` request.
4. The bot reports the resolved membership or a safe sync issue.

```js
const response = await fetch(
  `${process.env.OMTK_ORIGIN}/api/v1/events/${process.env.OMTK_EVENT_ID}` +
    `/external-members/discord/${encodeURIComponent(discordUser.id)}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.OMTK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: discordUser.username,
      eventRole: mappedRoleSlug,
      group: mappedGroupSlug,
    }),
  },
);
```

Store the API key only in the bot's protected server environment. Do not put it in Discord messages, command arguments, browser code, or the repository.

This is not “Sign in with Discord.” It synchronizes an external identity and event membership but creates no login or browser session.
