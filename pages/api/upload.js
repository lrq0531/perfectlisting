import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

const upload = multer({ dest: '/tmp' });
const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
  if (process.env.MOCK_MODE === 'true') {
    return res.status(200).json({ url: '/mock-images/sample-mug.jpg' });
  }
  try {
    const file = req.file;
    const data = fs.readFileSync(file.path);
    const filename = `${Date.now()}_${file.originalname}`;
    const { data: uploadData, error } = await supabaseAdmin.storage
      .from('product-images')
      .upload(`folder/${filename}`, data, {
        contentType: file.mimetype,
        upsert: false,
      });
    fs.unlinkSync(file.path);
    if (error) throw errord;

    const { data: publicData, error: urlErr } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(`folder/${filename}`);

    if (urlErr) throw urlErr;

    console.log('File uploaded successfully:', publicData.publicUrl);

    res.status(200).json({ url: publicData.publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

export const config = { api: { bodyParser: false } };
export default handler;
