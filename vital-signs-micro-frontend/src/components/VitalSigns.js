import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

const ADD_VITAL_SIGN = gql`
  mutation AddVitalSign($type: String!, $value: String!) {
    addVitalSign(type: $type, value: $value) {
      id
      type
      value
    }
  }
`;

const GET_VITAL_SIGNS = gql`
  query GetVitalSigns {
    vitalSigns {
      id
      type
      value
    }
  }
`;

const VitalSigns = () => {
  const [formData, setFormData] = useState({ type: '', value: '' });
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);
  const { loading, error, data } = useQuery(GET_VITAL_SIGNS);

  const handleAddVitalSign = async () => {
    try {
      await addVitalSign({ variables: formData });
      alert('Vital Sign added successfully!');
    } catch (error) {
      console.error('Add Vital Sign error:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Vital Signs</h2>
      <input type="text" placeholder="Type" onChange={e => setFormData({ ...formData, type: e.target.value })} />
      <input type="text" placeholder="Value" onChange={e => setFormData({ ...formData, value: e.target.value })} />
      <button onClick={handleAddVitalSign}>Add Vital Sign</button>
      
      <h3>Existing Vital Signs</h3>
      <ul>
        {data.vitalSigns.map(vs => (
          <li key={vs.id}>{vs.type}: {vs.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default VitalSigns;
