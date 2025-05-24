import { useState, useEffect } from 'react';
import { useUser } from '../../context/user_context';

export const useProfile = () => {
  const { currentUser } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setProfileData(currentUser);
      setLoading(false);
    }
  }, [currentUser]);

  const updateProfile = async (updatedData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular atualização
      const users = JSON.parse(localStorage.getItem('ze_aluga_users') || '[]');
      const userIndex = users.findIndex(user => user.id === currentUser.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...updatedData };
        users[userIndex] = updatedUser;
        
        // Atualizar localStorage
        localStorage.setItem('ze_aluga_users', JSON.stringify(users));
        localStorage.setItem('ze_aluga_current_user', JSON.stringify(updatedUser));
        
        setProfileData(updatedUser);
        setLoading(false);
        
        return { success: true, user: updatedUser };
      }
      
      throw new Error('Usuário não encontrado');
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const uploadAvatar = async (file) => {
    setLoading(true);
    setError(null);

    try {
      // Simular upload de avatar
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          const avatarUrl = e.target.result;
          const result = await updateProfile({ avatar: avatarUrl });
          
          setLoading(false);
          
          if (result.success) {
            resolve(result);
          } else {
            reject(new Error(result.error));
          }
        };
        
        reader.onerror = () => {
          setError('Erro ao fazer upload da imagem');
          setLoading(false);
          reject(new Error('Erro ao fazer upload da imagem'));
        };
        
        reader.readAsDataURL(file);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      // Validar senha atual
      const users = JSON.parse(localStorage.getItem('ze_aluga_users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      
      if (!user || user.password !== currentPassword) {
        throw new Error('Senha atual incorreta');
      }

      // Atualizar senha
      const result = await updateProfile({ password: newPassword });
      setLoading(false);
      
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const deleteAccount = async (password) => {
    setLoading(true);
    setError(null);

    try {
      // Validar senha
      const users = JSON.parse(localStorage.getItem('ze_aluga_users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      
      if (!user || user.password !== password) {
        throw new Error('Senha incorreta');
      }

      // Remover usuário
      const updatedUsers = users.filter(u => u.id !== currentUser.id);
      localStorage.setItem('ze_aluga_users', JSON.stringify(updatedUsers));
      localStorage.removeItem('ze_aluga_current_user');
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const getStats = () => {
    if (!currentUser?.is_seller) return null;

    // Simular estatísticas do vendedor
    return {
      products: currentUser.product_count || 0,
      followers: currentUser.followers_count || 0,
      rating: 4.8,
      sales: 156,
      revenue: 'R$ 12.450,00',
      views: 2845
    };
  };

  const getFavorites = () => {
    // Simular produtos favoritos
    const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser?.id}`) || '[]');
    return favorites;
  };

  const getOrders = () => {
    // Simular pedidos do usuário
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser?.id}`) || '[]');
    return orders;
  };

  return {
    profileData,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    changePassword,
    deleteAccount,
    getStats,
    getFavorites,
    getOrders,
    isOwner: currentUser?.is_seller || false
  };
};