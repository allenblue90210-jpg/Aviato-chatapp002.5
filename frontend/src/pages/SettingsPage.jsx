import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ModeInfoDialog from '../components/profile/ModeInfoDialog';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { 
    currentUser, 
    logout, 
    deleteAllChats, 
    theme, 
    setTheme 
  } = useAppContext();
  const { toast } = useToast();
  
  // Always return to /chat as per request
  const returnTo = '/chat';
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showModeInfo, setShowModeInfo] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/signin');
    toast({ title: t('settings.logged_out') });
  };

  const handleDeleteChats = () => {
    deleteAllChats();
    setShowDeleteModal(false);
    toast({ title: t('settings.chats_deleted') });
  };

  const showComingSoon = () => {
    toast({ title: t('settings.coming_soon') });
  };

  const getModeDisplay = (mode) => {
    const emojiMap = {
      green: '🟢',
      red: '🔴',
      yellow: '🟡',
      blue: '🔵',
      orange: '🟠',
      gray: '⚪',
      brown: '🟤'
    };
    
    if (!mode) return `🟢 ${t('mode.green.name')}`;
    
    return `${emojiMap[mode] || '🟢'} ${t(`mode.${mode}.name`)}`;
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'fr', name: 'Français' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'zh', name: '中文 (简体)' },
  ];

  const currentLanguageName = languages.find(l => l.code === i18n.language)?.name || 'English';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => navigate(returnTo)}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">{t('settings.title')}</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div 
        onClick={() => navigate('/profile')}
        className="bg-card mx-4 mt-4 rounded-xl shadow-sm border border-border p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
      >
        <img 
          src={currentUser?.profilePic || '/default-avatar.png'} 
          alt={currentUser?.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-muted"
        />
        <div className="flex-1">
          <div className="text-base font-semibold text-foreground">
            {currentUser?.name || 'Allen Brown'}
          </div>
          <div className="text-sm text-muted-foreground">{t('settings.view_profile')}</div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Availability Section */}
      <div className="px-4 py-3 mt-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('settings.availability')}
        </h2>
      </div>
      <div className="bg-card mx-4 mt-2 rounded-xl shadow-sm border border-border overflow-hidden">
        <button
          onClick={() => setShowModeInfo(true)}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🎨</span>
            <div className="text-left">
              <div className="font-medium text-base text-foreground">{t('profile.regulation')}</div>
              <div className="text-sm text-muted-foreground">
                Current: {getModeDisplay(currentUser?.availabilityMode)}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* App Section */}
      <div className="px-4 py-3 mt-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('settings.app')}
        </h2>
      </div>
      <div className="bg-card mx-4 mt-2 rounded-xl shadow-sm border border-border overflow-hidden">
        <SettingRow 
            icon="🌐" 
            label={t('settings.language')} 
            value={currentLanguageName} 
            onClick={() => setShowLanguageModal(true)} 
        />
        <SettingRow 
            icon="☀️" 
            label={t('settings.theme')} 
            value={theme ? (theme.charAt(0).toUpperCase() + theme.slice(1)) : 'System'} 
            onClick={() => setShowThemeModal(true)} 
        />
        <SettingRow icon="🔊" label={t('settings.voice')} value="Katerina" onClick={showComingSoon} />
        <SettingRow icon="🎨" label={t('settings.personalization')} onClick={() => setShowPersonalizationModal(true)} />
      </div>

      {/* About Section */}
      <div className="px-4 py-3 mt-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('settings.about')}
        </h2>
      </div>
      <div className="bg-card mx-4 mt-2 rounded-xl shadow-sm border border-border overflow-hidden">
        <SettingRow icon="📚" label={t('settings.model')} onClick={() => setShowModelModal(true)} />
        <SettingRow icon="📄" label={t('settings.terms')} onClick={() => setShowTermsModal(true)} />
        <SettingRow icon="🔒" label={t('settings.privacy')} onClick={() => setShowPrivacyModal(true)} />
        <SettingRow icon="ℹ️" label={t('settings.about')} onClick={() => setShowAboutModal(true)} />
      </div>

      {/* Contact Section */}
      <div className="bg-card mx-4 mt-6 rounded-xl shadow-sm border border-border overflow-hidden">
        <SettingRow icon="💬" label={t('settings.contact')} onClick={() => setShowContactModal(true)} />
      </div>

      {/* Danger Zone */}
      <div className="bg-card mx-4 mt-6 rounded-xl shadow-sm border border-border overflow-hidden">
        <SettingRow 
          icon="🚪" 
          label={t('settings.logout')} 
          onClick={() => setShowLogoutModal(true)} 
          showArrow={false}
          isDanger={true}
        />
      </div>

      <div className="bg-card mx-4 mt-4 rounded-xl shadow-sm border border-border overflow-hidden">
        <SettingRow 
          icon="🗑️" 
          label={t('settings.delete_chats')} 
          onClick={() => setShowDeleteModal(true)} 
          showArrow={false}
          isDanger={true}
        />
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('settings.theme')}</h3>
            
            <div className="space-y-2">
              {['light', 'dark', 'system'].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => {
                    setTheme(themeOption);
                    setShowThemeModal(false);
                    toast({ title: `Theme updated to ${themeOption}` });
                  }}
                  className={`
                    w-full px-4 py-3 rounded-lg text-left flex items-center justify-between
                    transition-colors border-2
                    ${theme === themeOption 
                      ? 'bg-primary/10 text-primary border-primary' 
                      : 'bg-muted text-foreground border-transparent hover:bg-accent'
                    }
                  `}
                >
                  <span className="capitalize font-medium">{themeOption}</span>
                  {theme === themeOption && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowThemeModal(false)}
              className="mt-4 w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border max-h-[80vh] flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-foreground flex-shrink-0">{t('settings.language')}</h3>
            
            <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setShowLanguageModal(false);
                    toast({ title: `Language changed to ${lang.name}` });
                  }}
                  className={`
                    w-full px-4 py-3 rounded-lg text-left flex items-center justify-between
                    transition-colors border-2 shrink-0
                    ${i18n.language === lang.code 
                      ? 'bg-primary/10 text-primary border-primary' 
                      : 'bg-card text-foreground border-muted hover:bg-accent'
                    }
                  `}
                >
                  <span className="font-medium">{lang.name}</span>
                  {i18n.language === lang.code && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowLanguageModal(false)}
              className="mt-4 w-full py-3 bg-secondary text-secondary-foreground border-2 border-transparent rounded-lg font-medium hover:bg-secondary/80 transition-colors flex-shrink-0 shadow-sm"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 text-foreground">{t('settings.logout')}?</h3>
            <p className="text-muted-foreground mb-6">
              {t('settings.confirm_logout')}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                {t('settings.logout')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {t('settings.confirm_delete')}
            </h3>
            <div className="flex items-start gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                {t('settings.delete_warning')}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleDeleteChats}
                className="flex-1 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('settings.contact')}</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <span className="text-xl">📧</span>
                <div className="overflow-hidden">
                  <div className="text-sm text-muted-foreground">Gmail</div>
                  <div className="font-medium text-foreground truncate" title="allenbrowndharak@gmail.com">allenbrowndharak@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <span className="text-xl">📱</span>
                <div>
                  <div className="text-sm text-muted-foreground">Phone No</div>
                  <div className="font-medium text-foreground">+2349168839812</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowContactModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
      {/* Personalization Modal */}
      {showPersonalizationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl max-h-[80vh] flex flex-col border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex-shrink-0">Aviato App Personalization</h3>
            
            <div className="overflow-y-auto space-y-4 mb-6 text-sm text-muted-foreground leading-relaxed pr-2">
              <p>Control how people reach you — and how the app treats you.</p>
              
              <h4 className="font-bold text-foreground mt-4">1. Availability Preferences (Core Personalization)</h4>
              <p>Users personalize how reachable they are, not just if.</p>
              {/* Keeping content in English as it is long text - could be translated later */}
              
              <button
              onClick={() => setShowPersonalizationModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
            </div>
            
            <button
              onClick={() => setShowPersonalizationModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
      {/* Model Modal */}
      {showModelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl max-h-[80vh] flex flex-col border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex-shrink-0">Aviato App Model</h3>
            <div className="overflow-y-auto space-y-4 mb-6 text-sm text-muted-foreground leading-relaxed pr-2">
              <p>A messaging system built on availability, reputation, and accountability.</p>
               {/* Keeping content in English as it is long text - could be translated later */}
            </div>
            <button
              onClick={() => setShowModelModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl max-h-[80vh] flex flex-col border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex-shrink-0">{t('settings.terms')}</h3>
            <div className="overflow-y-auto space-y-4 mb-6 text-sm text-muted-foreground leading-relaxed pr-2">
                 {/* Keeping content in English as it is long text - could be translated later */}
              <p className="font-bold text-foreground">Aviato Terms of Service</p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl max-h-[80vh] flex flex-col border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex-shrink-0">{t('settings.privacy')}</h3>
            <div className="overflow-y-auto space-y-4 mb-6 text-sm text-muted-foreground leading-relaxed pr-2">
               {/* Keeping content in English as it is long text - could be translated later */}
              <p className="font-bold text-foreground">Aviato Privacy Policy</p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}


      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-sm w-full p-6 shadow-xl max-h-[80vh] flex flex-col border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex-shrink-0">{t('settings.about')}</h3>
            <div className="overflow-y-auto space-y-4 mb-6 text-sm text-muted-foreground leading-relaxed pr-2">
              <p className="font-bold text-foreground">Aviato — Leave me alone.</p>
               {/* Keeping content in English as it is long text - could be translated later */}
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-accent transition-colors flex-shrink-0"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}

      {/* Mode Info Modal */}
      <ModeInfoDialog 
        isOpen={showModeInfo}
        onClose={() => setShowModeInfo(false)}
      />
    </div>
  );
}

function SettingRow({ 
  icon, 
  label, 
  value, 
  onClick, 
  showArrow = true,
  isDanger = false 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-4 flex items-center justify-between 
        border-b border-border last:border-b-0
        transition-colors cursor-pointer
        ${isDanger 
          ? 'text-destructive hover:bg-destructive/10 font-medium justify-center' 
          : 'hover:bg-accent text-foreground'
        }
      `}
    >
      {!isDanger && (
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-base">{label}</span>
        </div>
      )}
      
      {isDanger && (
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span>{label}</span>
        </div>
      )}
      
      {!isDanger && (
        <div className="flex items-center gap-2">
          {value && (
            <span className="text-sm text-muted-foreground">{value}</span>
          )}
          {showArrow && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/70" />
          )}
        </div>
      )}
    </button>
  );
}
