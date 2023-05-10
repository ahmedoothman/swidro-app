import classes from './index.module.scss';

const SmallSpinner = () => {
  return (
    <div className={classes.conatiner}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export { SmallSpinner };
