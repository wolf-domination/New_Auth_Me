import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSpots, deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal'
import CreateSpotModal from '../CreateSpotModal/CreateSpotModal'
import './ManageSpotsPage.css'

export default function ManageSpotsPage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.userList);
  const loading = useSelector(state => state.spots.loading);
  const { setModalContent, setOnModalClose } = useModal();
  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);
  if (loading) return <div className="manage-spots-container">Loading...</div>;

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      {spots.length === 0 ? (
        <button
          onClick={() => {
            setOnModalClose(() => () => dispatch(fetchUserSpots()));
            setModalContent(<CreateSpotModal />);
          }}
          className="manage-create-link"
        >
          Create a New Spot
        </button>
      ) : (
        <div className="manage-spots-list">
          {spots.map(spot => {
            const preview = spot.SpotImages.find(img => img.preview) || {};
            return (
              <div key={spot.id} className="manage-spot-card" onClick={() => {/* view detail */}}>
                <img src={preview.url} alt={spot.name} className="manage-spot-thumb" />
                <div className="manage-spot-details">
                  <div className="manage-spot-info">
                    <span>{spot.city}, {spot.state}</span>
                    <span className="rating">{preview.stars ? preview.stars.toFixed(1) : 'New'} ★</span>
                  </div>
                  <div className="manage-spot-price">${spot.price} night</div>
                  <div className="manage-spot-actions" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setOnModalClose(() => () => dispatch(fetchUserSpots()));
                        setModalContent(<CreateSpotModal spot={spot} />);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => dispatch(deleteSpot(spot.id))}
                      disabled={loading}
                    >
                      {loading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
