# Usage

Since we want folks who want to complain to do so asap, we have to add phone numbers to the contact information. We don't want to put our phone numbers into the public though, so we don't host them in this repo.

Instead, there is a utility function which prompts for phone numbers, inserts them into the text and converts the CoC to PDF for printing for the events.

To run it:

```sh
# Only need to this once
npm install

# Convert the readme
npm run convert
```

It will prompt you for as many phone numbers as you would like to add, and ouput `readme.pdf` ready for printing.
