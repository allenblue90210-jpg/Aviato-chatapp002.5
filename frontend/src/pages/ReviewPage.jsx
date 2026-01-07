
import React, { useState } from 'react';
import { Search, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import ModeIndicator from '../components/availability/ModeIndicator';
import RatingModal from '../components/chat/RatingModal';
import { useTranslation } from 'react-i18next';

const ReviewPage = () => {
  const { users, currentUser, submitReview } = useAppContext();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  // Filter users to only show those we've "chatted" with (mocked as all users for now minus self)
  const rateableUsers = users.filter(u => 
    u.id !== currentUser?.id && 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRateSubmit = (rating) => {
    if (selectedUser) {
        submitReview(selectedUser.id, rating);
    }
    setSelectedUser(null);
  };
  
  const toggleExpanded = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="p-4 space-y-4 pb-20 bg-background min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-foreground">{t('nav.review')}</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={t('review.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-muted border-border text-foreground"
        />
      </div>

      <div className="space-y-3">
        {rateableUsers.map(user => {
          // Check if current user has already rated this user
          const hasRated = user.reviews?.some(r => r.raterId === currentUser?.id);
          const userReviews = user.reviews || [];

          return (
            <div key={user.id} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={user.profilePic} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    <ModeIndicator mode={user.availabilityMode} className="absolute -top-1 -right-1" size="small" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-3 h-3 ${star <= Math.round(user.reviewRating) ? 'fill-current' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                         {user.reviewRating}/5 • {user.reviewCount} rates
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* Show toggle if user has reviews (or if user has rated them) */}
                    {(userReviews.length > 0 || hasRated) && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => toggleExpanded(user.id)}
                        >
                            {expandedUserId === user.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                    )}

                    <Button 
                      size="sm" 
                      variant={hasRated ? "secondary" : "outline"}
                      disabled={hasRated}
                      onClick={() => setSelectedUser(user)}
                      className={hasRated ? "bg-muted text-muted-foreground border-border" : "text-foreground hover:bg-accent"}
                    >
                      {hasRated ? t('review.rated') : t('review.rate')}
                    </Button>
                </div>
              </div>
              
              {/* Reviews List - Only visible if expanded AND (user has rated OR we decide to show always) */}
              {/* Requirement: "after i rate let it show the users that rate a person" -> Only show if hasRated is true? */}
              {/* Interpreting "only after i rate": If I haven't rated, I can't see who else rated. */}
              {expandedUserId === user.id && (
                  <div className="bg-muted/30 px-4 py-3 border-t border-border">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t('review.rated_by')}</h4>
                      {!hasRated ? (
                          <p className="text-sm text-muted-foreground italic">Rate this user to see who else has reviewed them.</p>
                      ) : (
                          <div className="space-y-2">
                              {userReviews.length === 0 ? (
                                  <p className="text-sm text-muted-foreground italic">No reviews yet.</p>
                              ) : (
                                  userReviews.map((review, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-sm p-2 bg-card rounded-lg border border-border shadow-sm">
                                          <div className="flex items-center gap-2">
                                            {review.raterProfilePic && (
                                              <img 
                                                src={review.raterProfilePic} 
                                                alt={review.raterName} 
                                                className="w-6 h-6 rounded-full object-cover"
                                              />
                                            )}
                                            <span className="text-foreground font-medium">
                                                {review.raterId === currentUser?.id ? "You" : review.raterName}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <span className="text-yellow-600 font-bold">{review.rating}</span>
                                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                          </div>
                                      </div>
                                  ))
                              )}
                          </div>
                      )}
                  </div>
              )}
            </div>
          );
        })}

        {rateableUsers.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            {t('review.no_users')}
          </div>
        )}
      </div>

      {selectedUser && (
        <RatingModal 
          isOpen={!!selectedUser} 
          onClose={() => setSelectedUser(null)}
          onRate={handleRateSubmit}
          userName={selectedUser.name}
          title={t('review.rate_user', { name: selectedUser.name })}
          type="review"
        />
      )}
    </div>
  );
};

export default ReviewPage;
