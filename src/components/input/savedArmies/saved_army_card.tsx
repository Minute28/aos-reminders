import React from 'react'
import { titleCase } from 'utils/titleCase'
import { useSubscription } from 'context/useSubscription'
import { LoadArmyBtn } from './load_army_btn'
import { ISavedArmyFromApi } from 'types/savedArmy'

interface ISavedArmyCardProps {
  army: ISavedArmyFromApi
}

export const SavedArmyCard: React.FC<ISavedArmyCardProps> = props => {
  const { army } = props

  const { deleteSavedArmy } = useSubscription()

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteSavedArmy(army.id)
    // TODO: Start a progress indicator until unmounted
    // TO show that we're deleting
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{titleCase(army.factionName)}</h5>
        <h6 className="card-subtitle mb-2 text-muted">ID: {army.id}</h6>
        <div>
          <ArmyBadges army={army} />
        </div>
        <div className="d-flex justify-content-center">
          <LoadArmyBtn army={army} />
          <button className="btn btn-sm btn-danger mx-3" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

interface IArmyBadgeProps {
  army: ISavedArmyFromApi
}

const ArmyBadges: React.FC<IArmyBadgeProps> = props => {
  const { army } = props

  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(army.selections).map((key, i) => {
            const items = army.selections[key]
            if (!items.length) return null

            return (
              <tr key={i}>
                <td>{titleCase(key)}</td>
                <td>
                  {items.map((item, ii) => {
                    return (
                      <span key={ii} className={`badge badge-primary mx-1`}>
                        {item}
                      </span>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
