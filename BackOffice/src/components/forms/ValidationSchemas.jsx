import {z} from 'zod';

const bookSchema = z.object({
  title: z.string().refine((title) => title.trim() !== '', {
    message: 'Title is required',
  }),
  author: z.string().refine((author) => author.trim() !== '', {
    message: 'Author is required',
  }),
  year: z.string().refine((year) => year.length === 4 && /^\d+$/.test(year), {
    message: 'Year must be 4 digits',
  }),
  genre: z.string().refine((genre) => genre.trim() !== '', {
    message: 'Genre is required',
  }),
  country: z.string().refine((country) => country.trim() !== '', {
    message: 'Country is required',
  }),
  pages: z.number().refine((pages) => pages > 0, {
    message: 'Pages must be a positive number',
  }),
  editor: z.string().refine((editor) => editor.trim() !== '', {
    message: 'Editor is required',
  }),
  isbn: z.string().refine((isbn) => /^\d{3}-\d-\d{4}-\d{4}-\d$/.test(isbn), {
    message: 'ISBN must be in the format XXX-X-XXXX-XXXX-X',
  }),
  summary: z.string().refine((summary) => summary.trim() !== '', {
    message: 'Summary is required',
  }),
  illustrator: z.string().optional(),
});



const userSchema = z.object({
  username: z.string().refine((username) => username.trim() !== '', {
    message: 'Username is required',
  }),
  email_address: z.string().email({
    message: 'Invalid email',
  }),
  // compare the two passwords
  password: z.string().refine((password) => password.trim() !== '', {
    message: 'Password is required',
  }),
  password2: z.string().refine((password2) => password2.trim() !== '', {
    message: 'Password is required',
  }),
  role: z.string().refine((role) => role.trim() !== '', {
    message: 'Role is required',
  }),
  country: z.string().refine((country) => country.trim() !== '', {
    message: 'Country is required',
  }),
  // the following field is a phone number, can only be numbers but can have a + at the beginning, have - / and . and is optional
  phone_number: z.string().refine((phone_number) => /^(\+)?(\d|\-|\.)*$/.test(phone_number), {
    message: 'Invalid phone number',
  }).optional(),
  news_letter: z.boolean()
}).refine((data) => data.password === data.password2, {
  message: 'Passwords must match',
});

const reviewSchema = z.object({
  isbn: z.string().refine((isbn) => /^\d{3}-\d-\d{4}-\d{4}-\d$/.test(isbn), {
    message: 'ISBN must be in the format XXX-X-XXXX-XXXX-X',
  }),
  title: z.string().refine((title) => title.trim() !== '', {
    message: 'Title is required',
  }),
  content: z.string().refine((content) => content.trim() !== '', {
    message: 'Content is required',
  }),
  rating: z.number().refine((rating) => rating >= 0 && rating <= 5, {
    message: 'Rating must be a positive number between 0 and 5 inclusive',
  }),
});

const commentSchema = z.object({
  content: z.string().refine((content) => content.trim() !== '', {
    message: 'Content is required',
  }),
});

export { bookSchema, userSchema, reviewSchema, commentSchema };
