/** Exercise04 - Form **/
const express = require('express');
const path = require('path');

const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const app = express();
const formPath = path.join(__dirname, 'form.html');

// Decode the fields sent by a standard HTML form.
app.use(express.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
  res.sendFile(formPath);
});

app.post('/submit', (req, res) => {
  const {
    username = '',
    email = '',
    comments = '',
    newsletter,
  } = req.body || {};

  // An unchecked checkbox is omitted from the submitted form data.
  const newsletterChoice = newsletter === 'yes' ? 'Yes' : 'No';
  const result = [
    'Form submission received',
    `Username: ${username}`,
    `Email: ${email}`,
    `Comments: ${comments}`,
    `Newsletter: ${newsletterChoice}`,
  ].join('\n');

  // Plain text displays entered HTML characters literally.
  res.status(200);
  res.set({
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.send(result);
});

app.use((req, res) => {
  res.status(404);
  res.set({ 'Content-Type': 'text/html' });
  res.send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/form`);
});
