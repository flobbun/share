# Usage

## Configuration

Go to the `sharing-map.js` file and place your sources and destionations of the corresponding folders in the `sharingMap` object.

## Running

Run the script with the following command:

```bash
node scripts/share [target]
```

Where `target` is the name of the folder you want to share.

### Example

```bash
node scripts/share frontend
```

I recommend you to create a script in your `package.json` file to make it easier to run the script.

```json
{
  "scripts": {
    "share": "node scripts/share"
  }
}
```

Then you can run the script with the following command:

```bash
npm run share frontend
```

## Commands

- `node scripts/share [target]` - Share the target folder.
- `node scripts/share [target] --watch` - Share the target folder and watch for changes.
- `node scripts/share all` - Share from all sources to all destinations.

## Notes

If the current implementation of watch mode doesn't work propertly in certain cases, as it uses `fs.watch`, I will implement it using `chokidar` in the future.
