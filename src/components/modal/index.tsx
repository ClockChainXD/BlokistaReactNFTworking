import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

interface PropsType {
  show: boolean;
  onHide?: () => void;
  label?: any;
  border?: boolean;
  children: any;
  className?: string;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
}
const Modal = (props: PropsType) => {
  return (
    // <Modal
    //   size="sm"
    //   show={props.show}
    //   onHide={props.onHide}
    //   backdrop="static"
    //   keyboard={false}
    //   centered
    //   aria-labelledby="contained-modal-title-vcenter"
    //   className={`shadow dialog-frame ${props.className}`}
    // >
    //   <Modal.Header className={props.border && 'border'} closeButton>
    //     {props.label}
    //   </Modal.Header>
    //   <Modal.Body>{props.children}</Modal.Body>
    // </Modal>
    <Dialog
      open={props.show}
      onClose={props.onHide}
      maxWidth={props.maxWidth}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};
export default Modal;
