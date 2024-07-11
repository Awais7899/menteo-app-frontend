import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {
  
  @objc func createAnimationView(rootView: UIView, lottieName: String) -> LottieAnimationView {
    let red  =  CGFloat((152 % 256)) / 255.0;
    let green  =  CGFloat((141 % 256)) / 255.0;
    let blue  =  CGFloat((255 % 256)) / 255.0;
    let alpha = CGFloat(1.0)
    
    let animationView = LottieAnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor.init(red: red, green: green, blue: blue, alpha: alpha);
    return animationView;
  }
  
  @objc func play(animationView: LottieAnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}

//246, 45, 100
