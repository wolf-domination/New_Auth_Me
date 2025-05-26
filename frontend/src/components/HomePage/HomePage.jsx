import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spots'
import { fetchReviews } from '../../store/review';
import './HomePage.css'
import Loader from '../Loader'

export default function HomePage() {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.list)
  const loading = useSelector(state => state.spots.loading)
  const reviewsBySpot = useSelector(state => state.reviews.bySpot);

  useEffect(() => {
    dispatch(fetchSpots({ page: 1, size: 20 }))
  }, [dispatch])

  useEffect(() => {
    spots.forEach(spot => {
      dispatch(fetchReviews(spot.id));
    });
  }, [dispatch, spots]);

  if (loading) return <Loader />

  return (
    <div className="home-container">
      <div className="spots-grid">
        {spots.map(spot => {
          const revs = reviewsBySpot?.[spot.id] || [];
          const avg = revs.length
            ? (revs.reduce((sum, r) => sum + r.stars, 0) / revs.length).toFixed(1)
            : 'New';
          return (
            <Link
              key={spot.id}
              to={`/spots/${spot.id}`}
              className="spot-card"
              title={spot.name}
            >
              <div className="spot-image">
                <img
                  src={spot.SpotImages?.find(img => img.preview)?.url || ''}
                  alt={spot.name}
                  className="spot-thumb"
                />
              </div>
              <div className="spot-info">
             
                  <h3>{spot.name}</h3>
                  <p>{spot.city}, {spot.state}</p>
                  <div className="spot-meta">
                    <span className="rating">
                      {avg === 'New' ? 'New' : `⭐ ${avg}`}
                    </span>
                    <span className="price">${spot.price}/night</span>
                  </div>
             
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
