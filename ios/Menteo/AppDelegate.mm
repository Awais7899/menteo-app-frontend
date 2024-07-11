#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h" // here
#import "Menteo-Swift.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"Menteo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
   if (success) {
     //This is where we will put the logic to get access to rootview
     UIView *rootView = self.window.rootViewController.view;
     
     rootView.backgroundColor = [UIColor colorWithRed:152.0/255.0 green:141.0/255.0 blue:255.0/255.0 alpha:1.0];// change with your desired backgroundColor

     Dynamic *t = [Dynamic new];
     UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:@"Animation"]; // change lottieName to your lottie files name
      
     // register LottieSplashScreen to RNSplashScreen
     [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
     // casting UIView type to AnimationView type
     LottieAnimationView *animationView = (LottieAnimationView *) animationUIView;
     // play
     [t playWithAnimationView:animationView];
     // If you want the animation layout to be forced to remove when hide is called, use this code
     [RNSplashScreen setAnimationFinished:true];
   }

  return success;


}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
