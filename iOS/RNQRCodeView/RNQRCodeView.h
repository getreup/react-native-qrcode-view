//
//  RNQRCodeView.h
//  RNQRCodeView
//
//  Created by Kelsey Regan on 2015-11-24.
//  Copyright © 2015 Elevated Pixels. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import  "RCTView.h"

@interface RNQRCodeView : RCTView
+(instancetype)newWithData:(NSArray*)data;
+(instancetype)newWithData:(NSArray*)data foregroundColor:(UIColor*)foregroundColor backgroundColor:(UIColor*)backgroundColor;
@end
