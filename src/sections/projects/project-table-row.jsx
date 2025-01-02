import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// import { useMyContext } from 'src/hooks/contextApi';
import Label from 'src/components/label';
import { deleteProject } from 'src/services/projectApiService';
import toast from 'react-hot-toast';
import Iconify from 'src/components/iconify';
import ConfirmationDialog from '../confirmation-dialog';
import ProjectModal from './project-modal';

// ----------------------------------------------------------------------
// id, description, projectName, category, status;
export default function ProjectTableRow({ project }) {
  // const {projects,setProjects}= useMyContext()
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [open, setOpen] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [edit,setEdit]=useState(project)
  // const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEdit=()=>{
    setEdit(project)
  }
  const handleProjectDeletion = async () => {
    const asyncOperation = async () => {
      setOpenDeleteDialog(false);
      const data = await deleteProject(project.id,project.rowVersion);
      return data

    };
    await toast.promise(asyncOperation(), {
      loading: 'Processing...',
      success: (data) => `Project deleted successfuly`,
      error: (err) => `Sorry, try again!`,
      duration: 3000,
    });
  };

  let statusColor;
  switch (project.status) {
    case 'Resolved':
      statusColor = 'success';
      break;
    case 'Reported':
      statusColor = 'error';
      break;

    case 'Testing':
      statusColor = 'warning';
      break;
    default:
      statusColor = 'info';
      break;
  }

  return (
    <>
    <ProjectModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} project={edit} />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleProjectDeletion}
      />
      <TableRow hover>
        
        <TableCell>{null}</TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {' '}
            <Link
              component={ReactRouterLink}
              to={`${project.id}`}
              color="inherit"
              underline="hover"
              variant="subtitle2"
            >
              {project.name}
            </Link>{' '}
          </Typography>
        </TableCell>


        <TableCell>{project.description}</TableCell>

        {/* <TableCell align="center">{project.category}</TableCell> */}

        <TableCell>
          <Label color={statusColor}>{project.status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={()=>{
          handleCloseMenu()
          setOpenCreateModal(true)
          handleEdit()
        }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProjectTableRow.propTypes = {
  project: PropTypes.object.isRequired,
};
