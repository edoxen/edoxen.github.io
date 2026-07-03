# Venue

A **Venue** is a polymorphic place where a [Meeting](/docs/meeting-collection)
happens. The `kind` field discriminates between **physical** and
**virtual**; all fields from both subtypes live on the one `Venue` class
as optional siblings.

This replaces v0.x `Location` (physical-only) and `Meeting.virtual:
Boolean` (insufficient — Zoom needs URL + passcode + dial-in numbers).

## Fields (common)

| Field | Type | Description |
|---|---|---|
| `kind` | enum | `physical` or `virtual` — required discriminator. |
| `name` | string | Display name (e.g. "Acme Boardroom"). |
| `label` | string | Short label (e.g. "Microsoft Teams — Directors only"). |
| `description` | string | Longer description. |
| `capacity` | integer | Maximum occupants. |
| `url` | string | Landing page URL for this venue. |

## Physical-venue fields

Populated when `kind: physical`.

| Field | Type | Description |
|---|---|---|
| `unlocode` | string | 5-char UN/LOCODE (e.g. `FRPAR`, `USNYC`, `HKHKG`). |
| `iata_code` | string | 3-char IATA airport/city code (e.g. `CDG`, `JFK`). |
| `address` | string | Street address. |
| `city` | string | City name. |
| `country_code` | string | ISO 3166-1 alpha-2 (e.g. `US`, `FR`). |
| `lat` / `lon` | float | Geo-coordinates. |
| `building` | string | Building name. |
| `floor` | string | Floor label. |
| `room` | string | Room label. |
| `access_notes` | string | Access instructions (e.g. "use side entrance"). |

UN/LOCODE and IATA codes are validated against the canonical `unlocodes`
and `iata` gems by `Edoxen::VenueValidator`.

## Virtual-venue fields

Populated when `kind: virtual`.

| Field | Type | Description |
|---|---|---|
| `uri` | string | URI (tel:, https:, sip:, xmpp:, rtsp:). |
| `features` | enum[] | iCalendar FEATURE-style: `audio`, `video`, `chat`, `phone`, `screen`, `feed`. |
| `passcode` | string | Access passcode. |
| `meeting_id` | string | Meeting ID (e.g. Zoom Webinar ID). |
| `dial_in_numbers` | string[] | PSTN dial-in numbers. |
| `waiting_room` | boolean | Whether a waiting room is enabled. |
| `registration_required` | boolean | Whether pre-registration is required. |

## Hybrid meetings

A Meeting with both physical and virtual venues is hybrid. The
`Meeting#hybrid?` / `#virtual_only?` / `#physical_only?` helpers
discriminate.

## Example

```yaml
venues:
  - kind: physical
    name: Acme Corporation Boardroom
    unlocode: USNYC
    iata_code: JFK
    address: 1 Acme Plaza, 5th Avenue, New York, NY 10001, USA
    country_code: US
    building: Acme Plaza
    floor: "42"
    room: Boardroom 42A
  - kind: virtual
    name: Video Conference
    label: Microsoft Teams — Directors only
    uri: https://teams.microsoft.com/l/meetup-join/acme-board
    passcode: "Director2026"
    features: [audio, video, screen, chat]
  - kind: virtual
    name: Phone Bridge
    label: International dial-in
    uri: tel:+1-800-555-1234,,,987654#
    features: [phone, audio]
```

## See also

- [Meeting Collection](/docs/meeting-collection) — where venues attach.
- [MeetingComponent](/docs/meeting-component) — components can pin a
  subset of the meeting's venues via `venue_refs[]`.
