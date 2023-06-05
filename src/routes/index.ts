import admin from '@/routes/admin';
import auth from '@/routes/auth';
import error from '@/routes/error';
import front from '@/routes/front';
export default [...admin, auth, error, front];
