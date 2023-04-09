import { Fragment } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from './staffItem.module.css';

interface ContextOutletProps {
  profile: {
    name: string;
  };
}

export default function StaffItem() {
  const { idStaff } = useParams();
  const navigate = useNavigate();
  const context = useOutletContext<ContextOutletProps>();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <button onClick={handleBack} className={styles.button}>
        Back to previous page
      </button>
      <div>StaffItem - {idStaff}</div>
      <div>name - {context?.profile?.name}</div>
    </Fragment>
  );
}
