import React, { FormEventHandler, useCallback } from 'react';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: React.FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const queryClient = useQueryClient();
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const onInviteMember: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/members`, {
          email: newMember,
        })
        .then((response) => {
          queryClient.refetchQueries(['workspace', workspace, 'member']);
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember, queryClient, setNewMember, setShowInviteWorkspaceModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;