import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { createSpot, updateSpot, createSpotImage } from '../../store/spots'
import './CreateSpotModal.css'

export default function CreateSpotModal({ spot = null }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  // Prefill if editing
  const [country, setCountry]       = useState(spot?.country || '')
  const [address, setAddress]       = useState(spot?.address || '')
  const [city, setCity]             = useState(spot?.city || '')
  const [stateVal, setStateVal]     = useState(spot?.state || '')
  const [lat, setLat]               = useState(spot?.lat ?? '')
  const [lng, setLng]               = useState(spot?.lng ?? '')
  const [description, setDescription] = useState(spot?.description || '')
  const [name, setName]             = useState(spot?.name || '')
  const [price, setPrice]           = useState(spot?.price || '')
  const [previewImage, setPreviewImage] = useState(
    spot?.SpotImages?.find(img => img.preview)?.url || ''
  )
  const [errors, setErrors]         = useState({})

  useEffect(() => {
    // reset errors when spot changes
    setErrors({})
  }, [spot])

  const validate = () => {
    const errs = {}
    if (!country.trim()) errs.country = 'Country is required'
    if (!address.trim()) errs.address = 'Street Address is required'
    if (!city.trim()) errs.city = 'City is required'
    if (!stateVal.trim()) errs.state = 'State is required'
    if (lat !== '') {
      const n = parseFloat(lat)
      if (isNaN(n) || n < -90 || n > 90) errs.lat = 'Latitude must be between -90 and 90'
    }
    if (lng !== '') {
      const m = parseFloat(lng)
      if (isNaN(m) || m < -180 || m > 180) errs.lng = 'Longitude must be between -180 and 180'
    }
    if (description.trim().length < 30)
      errs.description = 'Description needs 30 or more characters'
    if (!name.trim()) errs.name = 'Name of your spot is required'
    if (!price) errs.price = 'Price per night is required'
    if (!previewImage.trim()) errs.previewImage = 'Preview Image URL is required'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const validation = validate()
    if (Object.keys(validation).length) {
      setErrors(validation)
      setIsLoading(false)
      return
    }



    const payload = {
      address,
      city,
      state: stateVal,
      country,
      lat:    lat !== '' ? parseFloat(lat) : null,
      lng:    lng !== '' ? parseFloat(lng) : null,
      name,
      description,
      price:  parseFloat(price)
    }

    let savedSpot
    if (spot) {
      savedSpot = await dispatch(updateSpot(spot.id, payload))
    } else {
      savedSpot = await dispatch(createSpot(payload))
    }
    setIsLoading(false)

    await dispatch(createSpotImage({
      spotId: savedSpot.id,
      url: previewImage.trim(),
      preview: true
    }))

    closeModal()
    navigate(`/spots/${savedSpot.id}`)
  }

  return (
    <div className="create-spot-container">
      <h1>{spot ? 'Update Spot' : 'Create a New Spot'}</h1>
      <form onSubmit={handleSubmit} className="create-spot-form">
        {/* Keep the error list at the top */}
        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <h3>Please fix the following errors:</h3>
            <ul className="error-list">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <section className="form-section">
          <h2>Wheres your place located?</h2>
          <div className="input-group">
            <input
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="Country"
              className={errors.country ? 'input-error' : ''}
            />
            {errors.country && <p className="field-error">{errors.country}</p>}
          </div>
          
          <div className="input-group">
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street Address"
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>
          
          <div className="input-group">
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="City"
              className={errors.city ? 'input-error' : ''}
            />
            {errors.city && <p className="field-error">{errors.city}</p>}
          </div>
          
          <div className="input-group">
            <input
              value={stateVal}
              onChange={e => setStateVal(e.target.value)}
              placeholder="State"
              className={errors.state ? 'input-error' : ''}
            />
            {errors.state && <p className="field-error">{errors.state}</p>}
          </div>
          
          <div className="input-group">
            <input
              type="number" 
              step="any"
              value={lat}
              onChange={e => setLat(e.target.value)}
              placeholder="Latitude (optional)"
              className={errors.lat ? 'input-error' : ''}
            />
            {errors.lat && <p className="field-error">{errors.lat}</p>}
          </div>
          
          <div className="input-group">
            <input
              type="number" 
              step="any"
              value={lng}
              onChange={e => setLng(e.target.value)}
              placeholder="Longitude (optional)"
              className={errors.lng ? 'input-error' : ''}
            />
            {errors.lng && <p className="field-error">{errors.lng}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Describe your place to guests</h2>
          <div className="input-group">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Please write at least 30 characters"
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <p className="field-error">{errors.description}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Create a title for your spot</h2>
          <div className="input-group">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name of your spot"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Set a base price for your spot</h2>
          <div className="input-group">
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
              className={errors.price ? 'input-error' : ''}
            />
            {errors.price && <p className="field-error">{errors.price}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Liven up your spot with photos</h2>
          <div className="input-group">
            <input
              value={previewImage}
              onChange={e => setPreviewImage(e.target.value)}
              placeholder="Preview Image URL"
              className={errors.previewImage ? 'input-error' : ''}
            />
            {errors.previewImage && <p className="field-error">{errors.previewImage}</p>}
          </div>
        </section>

        <button type="submit" className="submit-btn">
          {isLoading ? 'Loading...' : spot ? 'Update Spot' : 'Create Spot'}
        </button>
      </form>
    </div>
  )
}
