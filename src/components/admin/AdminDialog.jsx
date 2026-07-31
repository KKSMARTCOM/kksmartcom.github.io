'use client';

import { FiAlertTriangle, FiX } from 'react-icons/fi';

export function ConfirmDialog({ open, title = 'Confirmer cette action', description, confirmLabel = 'Confirmer', danger = false, onConfirm, onClose }) {
  if (!open) return null;
  return <div className="admin-dialog-backdrop" role="presentation" onMouseDown={onClose}>
    <div className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <button className="admin-dialog-close" type="button" onClick={onClose} aria-label="Fermer"><FiX /></button>
      <div className={`admin-dialog-icon ${danger ? 'danger' : ''}`}><FiAlertTriangle /></div>
      <h2 id="admin-dialog-title">{title}</h2><p>{description}</p>
      <div className="admin-dialog-actions"><button type="button" className="admin-dialog-cancel" onClick={onClose}>Annuler</button><button type="button" className={danger ? 'admin-dialog-danger' : 'admin-dialog-confirm'} onClick={onConfirm}>{confirmLabel}</button></div>
    </div>
  </div>;
}

export function AdminNotice({ message, onClose }) {
  if (!message) return null;
  return <div className="admin-notice" role="status"><span>{message}</span><button type="button" onClick={onClose}><FiX /></button></div>;
}
