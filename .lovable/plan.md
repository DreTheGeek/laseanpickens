

# Wire Up Vapi Voice Agent Credentials

Update `src/hooks/useVapi.ts` to replace the placeholder values with your real credentials:

- **Public Key**: `8dcd034c-8b77-41aa-b9a8-e9763fe6509a`
- **Agent ID**: `8ed29746-98b6-4529-bf51-13882f74acac`

This is a two-line change in `src/hooks/useVapi.ts`, replacing the current placeholder strings. Once updated, the "Talk to LaSean" voice widget will connect to your live Vapi agent instead of running in demo mode.

## Technical Details

| File | Change |
|------|--------|
| `src/hooks/useVapi.ts` | Replace `VAPI_PUBLIC_KEY` and `VAPI_AGENT_ID` constants with real values |

