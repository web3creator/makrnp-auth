import { AgreeToTermsPolicy, experience } from '@logto/schemas';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import IdentifierPageLayout from '@/Layout/IdentifierPageLayout';
import { identifierInputDescriptionMap } from '@/utils/form';

import IdentifierRegisterForm from '../Register/IdentifierRegisterForm';

import useIdentifierSignUpMethods from './use-identifier-sign-up-methods';

const IdentifierRegister = () => {
  const { t } = useTranslation();
  const signUpMethods = useIdentifierSignUpMethods();

  /**
   * Fallback to sign-in page if no sign up methods are available (not allowed to create an account).
   */
  if (signUpMethods.length === 0) {
    return <Navigate to={`/${experience.routes.signIn}`} />;
  }

  return (
    <IdentifierPageLayout
      pageMeta={{ titleKey: 'description.create_your_account' }}
      title="description.create_account"
      description={t('description.identifier_register_description', {
        types: signUpMethods.map((identifier) => t(identifierInputDescriptionMap[identifier])),
      })}
      footerTermsDisplayPolicies={[AgreeToTermsPolicy.Automatic]}
      authOptionsLink={{
        to: `/${experience.routes.register}`,
        text: 'description.all_account_creation_options',
      }}
    >
      <IdentifierRegisterForm signUpMethods={signUpMethods} />
    </IdentifierPageLayout>
  );
};

export default IdentifierRegister;