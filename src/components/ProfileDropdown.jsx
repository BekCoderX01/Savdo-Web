import { useEffect, useRef } from "react";
import {
  BagIcon,
  ChevronDownIcon,
  HeartIcon,
  LogoutIcon,
  UserIcon,
} from "./Icons";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "FO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getShortName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Foydalanuvchi";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
}

function ProfileDropdown({
  user,
  ordersCount = 0,
  likedCount = 0,
  onGoProfile,
  onGoOrders,
  onGoLikes,
  onLogout,
}) {
  const detailsRef = useRef(null);

  const safeUser = user || {
    name: "Azizbek Karimov",
    email: "azizbek@example.com",
  };

  const initials = getInitials(safeUser.name);
  const shortName = getShortName(safeUser.name);

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        detailsRef.current.open = false;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMenu() {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }

  return (
    <details className="profile-dropdown" ref={detailsRef}>
      <summary className="profile-trigger">
        <span className="profile-avatar-sm">{initials}</span>
        <span className="profile-trigger-name">{shortName}</span>
        <span className="profile-trigger-chevron">
          <ChevronDownIcon />
        </span>
      </summary>

      <div className="profile-menu">
        <div className="profile-menu-head">
          <span className="profile-avatar-lg">{initials}</span>
          <div className="profile-user-info">
            <p className="profile-user-name">{safeUser.name}</p>
            <p className="profile-user-email">{safeUser.email}</p>
          </div>
        </div>

        <div className="profile-menu-list">
          <button
            type="button"
            className="profile-menu-item is-active"
            onClick={() => {
              closeMenu();
              onGoProfile?.();
            }}
          >
            <span className="profile-menu-left">
              <UserIcon />
              <span>Profilim</span>
            </span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => {
              closeMenu();
              onGoOrders?.();
            }}
          >
            <span className="profile-menu-left">
              <BagIcon />
              <span>Buyurtmalarim</span>
            </span>
            <span className="profile-menu-badge">{ordersCount}</span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => {
              closeMenu();
              onGoLikes?.();
            }}
          >
            <span className="profile-menu-left">
              <HeartIcon />
              <span>Sevimlilarim</span>
            </span>
            <span className="profile-menu-badge">{likedCount}</span>
          </button>
        </div>

        <div className="profile-menu-footer">
          <button
            type="button"
            className="profile-menu-item is-danger"
            onClick={() => {
              closeMenu();
              onLogout?.();
            }}
          >
            <span className="profile-menu-left">
              <LogoutIcon />
              <span>Chiqish</span>
            </span>
          </button>
        </div>
      </div>
    </details>
  );
}

export default ProfileDropdown;
